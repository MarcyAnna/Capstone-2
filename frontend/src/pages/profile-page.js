import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getUser } from "../services/user.service";

export const ProfilePage = () => {
  const [user, setUser] = useState({});

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getCurrentUser = async () => {
      const accessToken = await getAccessTokenSilently();

      const { data } = await getUser(accessToken);


      if (!isMounted) {
        return;
      }

      if (data) {
        setUser(data.user);
        console.log("setUser", data.user);
      }

    };

    getCurrentUser();


    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);


  const conditionsToRender = user?.conditions || [];

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          {user.firstName} {user.lastName}
        </h1>
        <div className="content__body">

          <span>
            <strong>
              {conditionsToRender.map((condition, index) => (
                <p key={index}>{condition}</p>
              ))}
            </strong>
          </span>
          <h4>Comments:</h4>
          <p> {user.user_comments} </p>
          <div className="profile-grid">
            <div className="profile__header">
              <div className="profile__headline">
                <h2 className="profile__title">{user.firstName}</h2>
              </div>
            </div>
            <div className="profile__details">
              <CodeSnippet
                title="Decoded ID Token"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
