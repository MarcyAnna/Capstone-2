import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getUser } from "../services/user.service";
import { getSymptoms, getSymptomLogByName, getSymptomLogByDate } from "../services/symptoms.service";

export const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [symptoms, setSymptoms] = useState([]);
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
      }

    };

    getCurrentUser();

    const getSymptom = async () => {

      const accessToken = await getAccessTokenSilently();

      const { data, error } = await getSymptoms(accessToken);

      if (!isMounted) {
        return;
      }

      if (data && data.symptoms) {
        setSymptoms(data.symptoms);
      }

      if (error) {
        setSymptoms(JSON.stringify(error, null, 2));
      }
    };

    getSymptom();


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
          <h3>My Conditions</h3>
          <span>
            <strong>
              {conditionsToRender.map((condition, index) => (
                <p key={index}>{condition}</p>
              ))}
            </strong>
          </span>
          <div className="profile-grid">
            <div className="profile__header">
              <div className="profile__headline">
                <h2 className="profile__title">Find Past Daily-Logs </h2>
              </div>
            </div>
            <div>
            <label>By Symptom Name:</label>
            <select
              value={symptomName}
              onChange={(e) => setSymptomName(e.target.value)}
              >
                <option value="">Select</option>
                {symptoms.map((symptom, index) => (
                  <option key={index} value={symptom}>
                    {symptom}
                  </option>
                ))} 
              </select>
            <button onClick={handleGetSymptomLogByName}>Symptom Name</button>
            <div>
            <label>By Log Date:</label>
            <input
              type="date"
              value={logDate}
              onChange={(e) => setLogDate(e.target.value)}
            />
            <button onClick={handleGetSymptomLogByDate}>Date</button>
            {symptomData && (
            <div>
              <h2>Symptom Log Data:</h2>
              <pre>{JSON.stringify(symptomData.data.getLog)}</pre>
            </div>
          )}
          </div>
          </div>
            <div className="profile__details">
              <CodeSnippet
                title="User Info"
                code={JSON.stringify(user, null, 2)}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
