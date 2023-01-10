import { useRouter } from "next/router";
import UserPanelLayout from "../../app/component/fixedArea/main";

export default function videos() {
  const router = useRouter();

  /* setLink */
  let link;
  switch (router.query.key) {
    case "theme":
      link = "https://www.youtube.com/embed/dlfDsDNgtIU";
      break;
    case "security":
      link = "https://www.youtube.com/embed/eJNIJ6HFQH4";
      break;
    default:
      link = "https://www.youtube.com/embed/65Bu2pbk048";
      break;
  }

  return (
    <div id="tutorVideo">
      <iframe className="videoFrame" src={link}></iframe>
    </div>
  );
}

videos.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
