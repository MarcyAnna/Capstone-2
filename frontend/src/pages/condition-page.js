import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getConditions, addCondition } from "../services/condition.service";

export const ConditionPage = () => {
  const [conditions, setConditions] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getCondition = async () => {

      const accessToken = await getAccessTokenSilently();

      const { data, error } = await getConditions(accessToken);

      if (!isMounted) {
        return;
      }

      if (data && data.conditions) {
        setConditions(data.conditions);
      }

      if (error) {
        setConditions(JSON.stringify(error, null, 2));
      }
    };

    getCondition();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  // add condition to user's profile
  async function setCondition(evt, condition) {
    evt.preventDefault();
    const accessToken = await getAccessTokenSilently();
    console.log("add condition", condition.id)
    await addCondition(accessToken, condition.id);
  }



  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Health Conditions
        </h1>
        <div className="content__body">
        <ul>
        {conditions.map((condition, index) => (
          <li key={index}>
            <strong>{condition.conditionName}</strong>: {condition.description}   |
            <button onClick={(evt) => setCondition(evt, condition)} >Add to Profile</button>
          </li>
        ))}
      </ul>
          <CodeSnippet title="Condition Info" code={JSON.stringify(conditions, null, 2)} />
        </div>
      </div>
    </PageLayout>
  );
};
