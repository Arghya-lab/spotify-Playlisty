import { useEffect } from "react";
import { useStates } from "@/context/StatesContext";
import getUserPlaylists from "@/utils/getUserPlaylists";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TypographyLarge } from "../ui/Typography";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import PlaylistItem from "../PlaylistItem";

function UserSection() {
  const { user, token, userPlaylistsData, setUserPlaylistsData } = useStates();

  useEffect(() => {
    if (!userPlaylistsData) {
      getUserPlaylists({ token, userId: user?.id, setUserPlaylistsData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const userModifiablePlaylists =
    userPlaylistsData?.items.filter(
      (item) => item.collaborative || item.owner.id === user.id
    ) || [];

  return (
    <section className="max-w-2xl m-auto pb-8 px-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={user.images ? user.images[0]?.url : ""}
                alt={user.display_name}
              />
              <AvatarFallback>
                {user.display_name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <TypographyLarge>{user.display_name}</TypographyLarge>
          </div>
          <CardDescription>
            Country code: {user.country} | Email: {user.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="pl-6 pb-4">
            {userModifiablePlaylists.map((playlist) => (
              <PlaylistItem key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default UserSection;
