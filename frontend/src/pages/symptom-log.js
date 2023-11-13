import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getSymptoms } from "../services/symptoms.service";

export const SymptomLog = () => {
  const [symptoms, setSymptoms] = useState([]);

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
        console.log(data.symptoms);
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

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Daily Symptom Log
        </h1>
        <div className="content__body">
          <p id="page-description">
         {symptoms}
          </p>
          <CodeSnippet title="Protected Message" code={JSON.stringify(symptoms, null, 2)} />
        </div>
      </div>
    </PageLayout>
  );
};
