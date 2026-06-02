import './YouTubeEmbed.css';

interface Props {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: Props) {
  return (
    <div className="yt-wrapper fade-in-up">
      <iframe
        className="yt-iframe"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
        title={`${title} - YouTube recipe`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
