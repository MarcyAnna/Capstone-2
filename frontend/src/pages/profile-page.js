import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getUser } from "../services/user.service";
import { getSymptoms, getSymptomLogByName, getSymptomLogByDate } from "../services/symptoms.service";

export const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [symptomData, setSymptomData] = useState(null);
  const [symptomName, setSymptomName] = useState("");
  const [logDate, setLogDate] = useState("");
  const [errMess, setErrMess] = useState("");

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
    try {
      if (!symptomName) {
        console.error('Symptom name is null or empty');
        return;
      }
      const accessToken = await getAccessTokenSilently();
      const logData = await getSymptomLogByName(accessToken, symptomName);
      setSymptomData(logData);

    } catch (error) {
      setErrMess("No result found!");
      console.error('Error fetching symptom log:', error);
    }
  };

  const handleGetSymptomLogByDate = async () => {
    try {
      if (!logDate) {
        console.error('Log date is snull or empty');
        return;
      }
      const accessToken = await getAccessTokenSilently();
      const logData = await getSymptomLogByDate(accessToken, logDate);
      setSymptomData(logData);
    }
    catch (error) {
      setErrMess("No result found");
      console.error('Error fetching log data;', error);
    }
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    const formattedDate = new Date(dateStr).toLocaleDateString('en-US', options);
    return formattedDate;
  }


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
          <a className="page-navigate" href="/conditions">(Add new conditions to profile on Conditions page)</a>
          <div>
            <hr style={{
              background: 'Turquoise',
              borderColor: 'Turquoise',
              height: '4px',
              marginTop: '40px',
            }} />
          </div>
          <div className="profile-grid">
            <div className="profile__header">
              <div className="profile__headline">
                <h4 className="profile__title">Find Past Symptom Logs: </h4>
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
              <button className="select-button" onClick={handleGetSymptomLogByName}>Symptom Name</button>
              <div>
                <label>By Log Date:</label>
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                />
                <button className="select-button" onClick={handleGetSymptomLogByDate}>Date</button>
              </div>
            </div>
            {symptomData && (
              <div className="profile__details" id="symptom-log">
                {errMess && <div className="error-message">{errMess}</div>}
                {!errMess && (
                  <div>
                    <h3>Symptom Log Data:</h3>
                    <pre>
                      {symptomData.data.getLog && symptomData.data.getLog[0] ? (
                        symptomData.data.getLog.map((item, index) => (
                          <div key={index}>
                            {item.symptom_name ? (
                              `${item.symptom_name}: ${item.severity}`
                            ) : (
                                formatDate(item.log_date)
                              )}
                          </div>
                        ))
                      ) : (
                          <div>No Symptom Data Found</div>
                        )}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
