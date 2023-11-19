import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getSymptoms, submitSymptomLog } from "../services/symptoms.service";

export const SymptomLog = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedValue, setSelectedValue] = useState('');
  const [submitResult, setSubmitResult] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSymptom || !selectedValue) {
      alert('Please select both a symptom and a numerical value.');
      return;
    }

    const accessToken = await getAccessTokenSilently();
    const result = await submitSymptomLog(accessToken, {
      symptom: selectedSymptom,
      value: selectedValue,
    });

    setSelectedSymptom("");
    setSelectedValue("");

    setSubmitResult("Symptom Added!");
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Daily Symptom Log
        </h1>
        <div className="content__body">
          <div id="page-description">
            <h3>Day's Log</h3>
            <h4>1.  Select a symptom you are experiencing</h4>
            <h4>2.  Select severity of that symptom, 10 being most severe</h4>
            <h4></h4>
            <div className="content-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="symptomSelect">Select a Symptom:</label>
                <select
                  id="symptomSelect"
                  value={selectedSymptom}
                  onChange={(e) => setSelectedSymptom(e.target.value)}
                >
                  <option value="">Select</option>
                  {symptoms.map((symptom, index) => (
                    <option key={index} value={symptom}>
                      {symptom}
                    </option>
                  ))}
                </select>
                <label htmlFor="valueSelect">Select Severity:</label>
                <select
                  id="valueSelect"
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <option value="">Select</option>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <button type="submit">Submit</button>

              </form>
              <h4>{submitResult}</h4>
            </div>
            <a className="page-navigate" href="/profile">Return to Profile Page</a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
