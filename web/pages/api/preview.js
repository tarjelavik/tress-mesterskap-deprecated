import { getPreviewByID } from "../../lib/api";

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.id) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Fetch the headless CMS to check if the provided `id` exists
  const post = await getPreviewByID(req.query.id);

  // If the id doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: "Invalid id" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.id as that might lead to open redirect vulnerabilities
  if (req.query.type == "match") {
    res.writeHead(307, { Location: `/match/${post._id}` });
  } else {
    return res.status(401).json({ message: "No page defined for type" });
  }
  res.end();
}
