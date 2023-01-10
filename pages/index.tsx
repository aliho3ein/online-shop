/* store */
import UserPanelLayout from "../app/component/fixedArea/main";

export default function HomePortal() {
  return (
    <div id="tutorVideo">
      <h1>Willkommen in Ihrem Manager-Dashboard</h1>
    </div>
  );
}

HomePortal.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
