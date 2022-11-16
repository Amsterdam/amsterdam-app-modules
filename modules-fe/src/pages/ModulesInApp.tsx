import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Select } from "@amsterdam/asc-ui";
import { Enlarge } from "@amsterdam/asc-assets";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as Edit } from "../assets/icons/edit.svg";
import Logo from "../components/Logo";
import PageTitle from "../components/PageTitle";
import useAPICalls from "../components/useAPICalls";
import ListModules from "../components/ListModules";
import Button from "../components/button/Button";

const ModulesInApp = () => {
  const hasFetchedData = useRef(false);
  const appVersionHasChanged = useRef(true);
  const [appVersions, setAppVersions] = useState([]);
  const [appVersion, setAppVersion] = useState("");
  const [modulesByApp, setModulesByApp] = useState([]);
  const { getMethod } = useAPICalls();
  const navigate = useNavigate();

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
      }
    };

    if (!hasFetchedData.current) {
      getAppVersions();
      hasFetchedData.current = true;
    }
  }, [appVersions, getMethod]);

  const changeVersion = (version: string) => {
    setAppVersion(version);
    appVersionHasChanged.current = true;
  };

  return (
    <div>
      {/* Logo */}
      <Logo />

      {/* Title component */}
      <PageTitle pageTitle="Modules in app" />

      {/* Dummy links to test navigation */}
      <div className="page_body">
        {/* Select appVersion */}
        <div
          style={{
            position: "absolute",
            left: "15px",
            width: "344px",
            height: "48px",
          }}
        >
          <Select
            onChange={(event) =>
              changeVersion(
                (event.target as unknown as { value: string }).value
              )
            }
            value={appVersion}
          >
            {appVersions.map((version) => (
              <option key={version} value={version}>
                Versie {version}
              </option>
            ))}
          </Select>
        </div>

        {/* Modules for this appVersion */}
        <div
          style={{
            paddingTop: "25px",
          }}
        >
          <ListModules modules={modulesByApp} />
        </div>

        {/* Button navigation */}
        <div id="wrapper">
          <Button onClick={() => navigate(`/new-module/${appVersion}`)}>
            <Enlarge fill="white" height="14px" />
          </Button>
          <Button onClick={() => navigate(`/edit-modules/${appVersion}`)}>
            <Edit fill="white" height="14px" />
          </Button>
          <Button onClick={() => navigate(`/toggle-modules/${appVersion}`)}>
            Aan / Uit
          </Button>
          <Button onClick={() => navigate("/new-app-version")}>
            Maak nieuwe app versie
          </Button>
        </div>

        {/*
                    <Link to={`/toggle-modules/${appVersion}`}>EditModules</Link>
                */}
      </div>
    </div>
  );
};

export default ModulesInApp;
