export const processHashtags = (caption) => {
  // parse caption
  const hashtags = caption.match(/#[\w]+/g) || [];
  // get or create Hashtags
  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
