import { UserCard } from 'components/UserCard';
import { useAppSelector } from 'lib/redux/hooks';
import { useListView } from '@/context/ListViewContext';

export function UsersList() {
  const { isListView } = useListView();

  const users = useAppSelector((state) => state.users.users);
  const searchQuery = useAppSelector((state) => state.users.searchQuery);
  const searchUsers = useAppSelector((state) => state.users.searchUsers);

  const activeUsers = searchQuery ? searchUsers : users;

  return (
    <section className={`users-list wrapper ${isListView ? 'list' : ''}`}>
      {activeUsers &&
        activeUsers.map((user) => <UserCard key={user.id} userData={user} />)}
    </section>
  );
}
