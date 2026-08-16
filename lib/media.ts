import { MediaType } from "@/lib/types";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";

export type MediaPayload = {
  uri: string;
  type: MediaType;
  thumbnailUri?: string;
};

const VIDEO_EXTENSIONS = new Set([
  "mp4",
  "mov",
  "m4v",
  "avi",
  "mkv",
  "webm",
  "3gp",
  "3g2",
]);

export function getMediaType(
  media: { type?: MediaType } | null | undefined,
): MediaType {
  return media?.type === "video" ? "video" : "image";
}

function extensionFromPath(path: string | null | undefined): string | null {
  if (!path) return null;
  const withoutQuery = path.split("?")[0] ?? path;
  const match = withoutQuery.match(/\.([a-z0-9]+)$/i);
  return match?.[1]?.toLowerCase() ?? null;
}

/** Expo can return type=null on some Android ContentProviders; fall back to other asset fields. */
export function resolveMediaType(
  asset: ImagePicker.ImagePickerAsset,
): MediaType {
  if (asset.type === "video" || asset.type === "pairedVideo") {
    return "video";
  }
  if (asset.type === "image" || asset.type === "livePhoto") {
    return "image";
  }

  // type is null/unknown — use secondary signals
  if (asset.mimeType?.startsWith("video/")) {
    return "video";
  }
  if (typeof asset.duration === "number" && asset.duration > 0) {
    return "video";
  }

  const ext =
    extensionFromPath(asset.fileName) ?? extensionFromPath(asset.uri);
  if (ext && VIDEO_EXTENSIONS.has(ext)) {
    return "video";
  }

  return "image";
}

export async function createMediaFromAsset(
  asset: ImagePicker.ImagePickerAsset,
): Promise<MediaPayload> {
  const type = resolveMediaType(asset);

  if (type === "image") {
    return { uri: asset.uri, type };
  }

  try {
    const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(
      asset.uri,
      { time: 0, quality: 0.6 },
    );
    return { uri: asset.uri, type, thumbnailUri };
  } catch {
    return { uri: asset.uri, type };
  }
}
