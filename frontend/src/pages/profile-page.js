import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getUser } from "../services/user.service";
import { getSymptomLogByName, getSymptomLogByDate } from "../services/symptoms.service";

export const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [symptomData, setSymptomData] = useState(null);
  const [symptomName, setSymptomName] = useState(""); 
  const [logDate, setLogDate] = useState("");

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

  const handleGetSymptomLogByName = async () => {
    const accessToken = await getAccessTokenSilently();
    const logData = await getSymptomLogByName(accessToken, symptomName);
    setSymptomData(logData);
  };

  const handleGetSymptomLogByDate = async () => {
    const accessToken = await getAccessTokenSilently();
    const logData = await getSymptomLogByDate( accessToken, logDate);
    setSymptomData(logData);
  };


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
            <div>
            <label>Symptom ID:</label>
            <input
              type="text"
              value={symptomName}
              onChange={(e) => setSymptomName(e.target.value)}
            />
            <button onClick={handleGetSymptomLogByName}>Get Symptom Log by ID</button>
            <div>
            <label>Log Date:</label>
            <input
              type="date"
              value={logDate}
              onChange={(e) => setLogDate(e.target.value)}
            />
            <button onClick={handleGetSymptomLogByDate}>Get Symptom Log by Date</button>
            {symptomData && (
            <div>
              <h2>Symptom Log Data:</h2>
              <pre>{JSON.stringify(symptomData, null, 2)}</pre>
            </div>
          )}
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
