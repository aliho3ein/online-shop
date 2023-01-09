/* store */
import UserPanelLayout from "../app/component/fixedArea/main";

export default function HomePortal() {
  return <h1>Wellkommen to the Portal</h1>;
}

HomePortal.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
