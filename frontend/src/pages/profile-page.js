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

  


  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          { user.firstName } { user.lastName }
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              <strong>All about you!</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
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
