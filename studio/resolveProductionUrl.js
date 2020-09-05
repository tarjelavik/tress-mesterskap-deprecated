const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET
const projectUrl = process.env.SANITY_STUDIO_PREVIEW_API

console.log(projectUrl)
export default function resolveProductionUrl(document) {
  return `${projectUrl}?secret=${previewSecret}&id=${document._id}&type=${document._type}`
}
