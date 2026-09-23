// Accepts either the full URL or just the ID, from YouTube or Vimeo
export function parseVideo(value: string) {
    const youtube = value.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (youtube) return { provider: 'youtube', id: youtube[1] };

    const vimeo = value.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return { provider: 'vimeo', id: vimeo[1] };

    return { provider: /^\d+$/.test(value) ? 'vimeo' : 'youtube', id: value };
}

export function getVideoThumbnail(value: string) {
    const video = parseVideo(value);

    return video.provider === 'youtube'
        ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
        : `https://vumbnail.com/${video.id}.jpg`;
}
