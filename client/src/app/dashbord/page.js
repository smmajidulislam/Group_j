import AccountSettings from "../components/dashbord/AccountSettings";
import CreatePostButton from "../components/dashbord/CreatePostButton";
import PostList from "../components/dashbord/PostLists";
import ProfileSummary from "../components/dashbord/ProfileSummary";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <ProfileSummary />
      <CreatePostButton />
      <PostList />
      <AccountSettings />
    </div>
  );
}
