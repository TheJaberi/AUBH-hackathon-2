import React, { useEffect } from "react";
import Greeting from "../../../components/claudeUI/claudeUI";
import Card from "../../../components/Card/card";

const Privacy: React.FC = () => {
    // usestate for username
    const [username, setUserName] = React.useState<string | null>(null);

    useEffect(() => {
        setUserName(localStorage.getItem('userName'));
    }, []);

    return (
        <>
            <Card title="hello" content="world"/>
            <Greeting username={username || 'user'} />
        </>
    );
}

export default Privacy;