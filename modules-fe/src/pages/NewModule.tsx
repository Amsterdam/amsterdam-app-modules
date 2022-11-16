import { useState, useEffect, FormEventHandler } from "react";
import { useParams } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import PageTitle from "../components/PageTitle";
import InputField from "../components/InputField";
import useAPICalls from "../components/useAPICalls";

const NewModule = () => {
  const { appversion } = useParams();
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const { postMethod } = useAPICalls();

  useEffect(() => {
    setError("");
  }, [slug, title, icon, description, version]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const payloadModule = {
      slug,
      title,
      icon,
      description,
      version,
    };
    const payloadModuleByApp = {
      appVersion: appversion,
      moduleSlug: slug,
      moduleVersion: version,
      status: 1,
    };

    // Check for empty values
    const emptyKeys = Object.keys(payloadModule)
      .filter((key) => payloadModule[key as keyof typeof payloadModule] === "")
      .join(", ");
    if (emptyKeys) {
      setError(`${emptyKeys} not set`);
      return;
    }

    try {
      const object = await postMethod("modules", {}, payloadModule);
      const result = await postMethod("modules_by_app", {}, payloadModuleByApp);
      if (object.response.status === 200 && result.response.status === 200) {
        setSlug("");
        setTitle("");
        setIcon("");
        setDescription("");
        setVersion("");
      } else if (Object.prototype.hasOwnProperty.call(object.data, "result")) {
        if (Object.prototype.hasOwnProperty.call(object.data.result, "error")) {
          setError(object.data.result.error);
        } else {
          setError(object.data.result);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <Navigation location="/" text="Terug" />

      {/* Title component */}
      <PageTitle pageTitle="Nieuwe module" />

      {/* Input fields */}
      <div className="page_body">
        <form style={{ maxWidth: "344px" }} onSubmit={onSubmit}>
          <InputField identifier="Slug" value={slug} setValue={setSlug} />
          <InputField identifier="Title" value={title} setValue={setTitle} />
          <InputField identifier="Icon" value={icon} setValue={setIcon} />
          <InputField
            identifier="Description"
            value={description}
            setValue={setDescription}
          />
          <InputField
            identifier="Version"
            value={version}
            setValue={setVersion}
          />

          <div
            style={{
              color: "red",
              marginLeft: "15px",
              height: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {error}
          </div>

          <button className="button-full-width" type="button">
            <span className="submitlogintext">Voeg module toe</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewModule;
