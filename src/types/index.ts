export type Group = 'men' | 'women' | 'unisex'
export type Tag = 'hair' | 'beard' | 'beauty' | 'package'
export interface Service { id: string; name: string; description: string; group: Group; tags: Tag[]; duration: string; price: string }
export interface Member { id: string; name: string; role: string; specialty: string; bio: string; services: string[]; photo?: string }
export interface GalleryItem { id: string; category: string; alt: string; src?: string }
export interface Review { id: string; name: string; rating: number; text: string; platform?: string; date?: string }
export interface HoursRow { days: string; time: string }
