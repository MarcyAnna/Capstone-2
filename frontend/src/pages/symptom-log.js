import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getSymptoms, submitSymptomLog } from "../services/symptoms.service";

export const SymptomLog = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedValue, setSelectedValue] = useState('');
  const [submitResult, setSubmitResult] = useState(null);

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

    setSubmitResult(result);
  };


  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Daily Symptom Log
        </h1>
        <h3>Log Today's Symptoms</h3>
        <h4>Select a symptom you are experiencing today and then pick the itensity of it with 10 being the most severe</h4>
        <div className="content__body">
          <div id="page-description">
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
          </div>
          <CodeSnippet title="Symptom List" code={JSON.stringify(symptoms, null, 2)} />
        </div>
      </div>
    </PageLayout>
  );
};
