/**
 * firebase.ts — FE Only Static Stub
 *
 * Tidak ada koneksi ke Firebase, Supabase, atau database apapun.
 * File ini bertindak sebagai alias untuk seluruh paket firebase/* agar TypeScript
 * tidak melempar error, sementara aplikasi berjalan murni FE-only.
 */

// ─── Dummy db & auth export ────────────────────────────────────────────────
export const db: any = {};
export const auth: any = {};

// ─── Firestore dummy types & functions ────────────────────────────────────

export type DocumentData = Record<string, any>;

/** Dummy User type (alias untuk firebase/auth) */
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

// Firestore aliases
export function collection(..._args: any[]): any { return {}; }
export async function getDocs(_ref: any): Promise<any> { return { docs: [] }; }
export async function addDoc(_ref: any, _data: any): Promise<any> { return { id: `id-${Date.now()}` }; }
export async function deleteDoc(_ref: any): Promise<void> { }
export function doc(..._args: any[]): any { return {}; }
export async function updateDoc(_ref: any, _data: any): Promise<void> { }
export async function getDoc(_ref: any): Promise<any> { return { exists: () => false, data: () => ({}) }; }
export async function setDoc(_ref: any, _data: any): Promise<void> { }
export function query(..._args: any[]): any { return {}; }
export function orderBy(..._args: any[]): any { return {}; }
export function limit(..._args: any[]): any { return {}; }
export function where(..._args: any[]): any { return {}; }

// ─── Auth dummy functions ─────────────────────────────────────────────────

let _currentUser: User | null = null;
const _listeners: Array<(u: User | null) => void> = [];

export function onAuthStateChanged(_auth: any, cb: (u: User | null) => void): () => void {
  _listeners.push(cb);
  setTimeout(() => cb(_currentUser), 0);
  return () => { const i = _listeners.indexOf(cb); if (i !== -1) _listeners.splice(i, 1); };
}

export async function signInWithEmailAndPassword(_auth: any, email: string, _password: string): Promise<{ user: User }> {
  _currentUser = { uid: 'admin-static', email };
  _listeners.forEach(cb => cb(_currentUser));
  return { user: _currentUser };
}

export async function signOut(_auth: any): Promise<void> {
  _currentUser = null;
  _listeners.forEach(cb => cb(null));
}

// ─── App dummy ────────────────────────────────────────────────────────────
export function initializeApp(_config: any): any { return {}; }
export function getApp(): any { return {}; }
export function getFirestore(_app?: any): any { return db; }
export function getAuth(_app?: any): any { return auth; }
export function getStorage(_app?: any): any { return {}; }
