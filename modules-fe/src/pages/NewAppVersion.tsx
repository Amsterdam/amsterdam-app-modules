import { useRef, useState, useEffect } from "react";
import { Module } from "types/module";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import PageTitle from "../components/PageTitle";
import useAPICalls from "../components/useAPICalls";
import ListModules from "../components/ListModules";

const NewAppVersion = () => {
  const hasFetchedData = useRef(false);
  const appVersionHasChanged = useRef(true);
  const newLog = useRef(false);
  const [appVersions, setAppVersions] = useState<string[]>([]);
  const [appVersion, setAppVersion] = useState("");
  const [newAppVersion, setNewAppVersion] = useState("");
  const [log, setLog] = useState("");
  const [modulesByApp, setModulesByApp] = useState<Array<Module>>([]);
  const { getMethod, postMethod } = useAPICalls();

  const changeVersion = (version: string) => {
    setAppVersion(version);
    appVersionHasChanged.current = true;
  };

  useEffect(() => {
    const getModulesByApp = async () => {
      const { data, response } = await getMethod(
        "modules_for_app",
        {},
        { appVersion }
      );
      if (response.status === 200) {
        setModulesByApp(data.result);
      }
    };

    if (appVersion !== "" && appVersionHasChanged.current) {
      getModulesByApp();
      appVersionHasChanged.current = false;
    }
  }, [appVersion, getMethod]);

  useEffect(() => {
    const getAppVersions = async () => {
      const { data, response } = await getMethod("app-versions", {});
      if (response.status === 200) {
        setAppVersions(data.result);
        if (data.result.lenght !== 0) {
          changeVersion(data.result[0]);
        }
      } else {
        setAppVersions(["0.0.0"]);
      }
    };

    if (!hasFetchedData.current) {
      getAppVersions();
      hasFetchedData.current = true;
    }
  }, [appVersions, getMethod]);

  useEffect(() => {
    if (newLog.current) {
      setTimeout(() => {
        setLog("");
        newLog.current = false;
      }, 3000);
    }
  }, [log]);

  const saveAppVersion = async () => {
    const NewModulesByApp = modulesByApp.map((module) => {
      return {
        appVersion: newAppVersion,
        moduleSlug: module.slug,
        moduleVersion: module.version,
        status: module.status,
      };
    });
    NewModulesByApp.forEach(async (module) => {
      const { data, response } = await postMethod("modules_by_app", {}, module);
      newLog.current = true;
      setLog(data.result);
      if (response.status !== 200) {
        console.log("save modules failed:", module);
      }
    });
  };

  return (
    <div>
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <Navigation location="/" text="Terug" />

      {/* Title component */}
      <PageTitle pageTitle="Nieuwe app versie" />

      <div className="page_body">
        <input
          className="version"
          type="text"
          id="versio"
          placeholder={appVersion}
          autoComplete=""
          onChange={(e) => setNewAppVersion(e.target.value)}
          value={newAppVersion}
          required
        />

        <ListModules modules={modulesByApp} />

        <div
          style={{
            color: "red",
            marginLeft: "15px",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {log}
        </div>

        <button className="saveButton" onClick={saveAppVersion} type="button">
          <span className="submitlogintext">Maak nieuwe versie aan</span>
        </button>
      </div>
    </div>
  );
};

export default NewAppVersion;
