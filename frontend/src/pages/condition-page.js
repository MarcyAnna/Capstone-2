import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getConditions } from "../services/condition.service";

export const ConditionPage = () => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getCondition = async () => {
      const { data, error } = await getConditions();

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
  }, []);

  

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
            <strong>{condition.conditionName}</strong>: {condition.description}
          </li>
        ))}
      </ul>
          <CodeSnippet title="Public Message" code={JSON.stringify(conditions, null, 2)} />
        </div>
      </div>
    </PageLayout>
  );
};
