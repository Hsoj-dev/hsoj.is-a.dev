// src\routes\projects\hsoj-tab\news\+server.ts
// Served at: GET /projects/hsoj-tab/news
import { error, json } from '@sveltejs/kit';
import { FREENEWSAPI_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const BASE_URL = 'https://api.freenewsapi.io/v1';
const COUNTRY = 'ph';
const LANGUAGE = 'en';

const MAX_ARTICLES = 7; // how many stories the card rotates through
const CACHE_MS = 15 * 60 * 1000; // refresh from the API at most every 15 min
const REQUEST_GAP_MS = 600; // API limit is 2 req/sec
const DESCRIPTION_LENGTH = 160;

type ListItem = { uuid: string; title: string; published_at: string; publisher: string };
type Details = {
	uuid: string;
	title: string;
	thumbnail?: string;
	publisher: string;
	published_at: string;
	original_url: string;
	body?: string;
};

export type NewsArticle = {
	uuid: string;
	title: string;
	publisher: string;
	publishedAt: string;
	thumbnail: string | null;
	description: string;
	url: string;
};

let cache: { at: number; articles: NewsArticle[] } | null = null;
let inFlight: Promise<NewsArticle[]> | null = null;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api<T>(path: string, params: Record<string, string>): Promise<T> {
	const url = new URL(BASE_URL + path);
	url.search = new URLSearchParams(params).toString();
	const res = await fetch(url, { headers: { 'x-api-key': FREENEWSAPI_KEY } });
	if (!res.ok) throw new Error(`freenewsapi ${path} responded ${res.status}`);
	return res.json() as Promise<T>;
}

function toDescription(body = ''): string {
	const clean = body.replace(/\s+/g, ' ').trim();
	return clean.length > DESCRIPTION_LENGTH ? clean.slice(0, DESCRIPTION_LENGTH).trimEnd() + '…' : clean;
}

async function buildArticles(): Promise<NewsArticle[]> {
	const list = await api<{ data: ListItem[] }>('/news', { country: COUNTRY, language: LANGUAGE });

	const newest = [...list.data]
		.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
		.slice(0, MAX_ARTICLES);

	// /news has no image or body, so fetch /details for each (sequentially, to respect rate limit)
	const articles: NewsArticle[] = [];
	for (const item of newest) {
		try {
			const { data } = await api<{ data: Details }>('/details', { uuid: item.uuid });
			articles.push({
				uuid: data.uuid,
				title: data.title,
				publisher: data.publisher,
				publishedAt: data.published_at,
				thumbnail: data.thumbnail ?? null,
				description: toDescription(data.body),
				url: data.original_url
			});
		} catch (e) {
			console.error('[hsoj-tab/news] details failed for', item.uuid, e);
		}
		await sleep(REQUEST_GAP_MS);
	}
	return articles;
}

export const GET: RequestHandler = async () => {
	if (cache && Date.now() - cache.at < CACHE_MS) {
		return json({ articles: cache.articles }, { headers: { 'cache-control': 'private, max-age=300' } });
	}

	try {
		inFlight ??= buildArticles().finally(() => (inFlight = null));
		const articles = await inFlight;
		if (articles.length) cache = { at: Date.now(), articles };
	} catch (e) {
		console.error('[hsoj-tab/news]', e);
	}

	// serve stale data if a refresh failed
	if (cache) return json({ articles: cache.articles });
	error(502, 'News unavailable');
};
