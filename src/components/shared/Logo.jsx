import logoCompact from "../../assets/logo-compact.svg";
import logoFull from "../../assets/logo-full.svg";

function Logo({ type = "full", width = "100px" }) {
  const logoSrc = type === "full" ? logoFull : logoCompact;
  return (
    <div>
      <img src={logoSrc} alt="MB logo" width={width} />
    </div>
  );
}

export default Logo;
