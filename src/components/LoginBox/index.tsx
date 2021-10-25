import { VscGithubInverted } from "react-icons/vsc";
import { useAuth } from "../../contexts/AuthProvider";

import styles from "./styles.module.scss";

export function LoginBox() {
  const { signinUrl } = useAuth();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>

      <a href={signinUrl} className={styles.signinWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
}
