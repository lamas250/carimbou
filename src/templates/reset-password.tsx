import * as React from "react";
import { Html, Head, Preview, Body, Container, Section, Text } from "@react-email/components";

interface ResetPasswordTemplateProps {
  title?: string;
}

export const ResetPasswordTemplate: React.FC<Readonly<ResetPasswordTemplateProps>> = ({
  title,
}) => (
  <Html>
    <Head />
    <Preview>Redefinir Senha</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section style={styles.section}>
          <Text style={styles.title}>Solicitação de Redefinição de Senha</Text>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.footer}>
            Se você não solicitou essa redefinição, ignore este email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Estilos inline para compatibilidade
const styles = {
  body: {
    backgroundColor: "#F9FAFB",
    fontFamily: "Arial, sans-serif",
    padding: "30px",
    paddingTop: "80px",
    paddingBottom: "80px",
  },
  container: {
    backgroundColor: "#101828",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center" as const,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  section: {
    padding: "10px",
    backgroundColor: "#F9FAFB",
    borderRadius: "8px",
  },
  text: {
    color: "black",
    fontSize: "16px",
    margin: "10px 0",
  },
  title: {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  },
  footer: {
    color: "gray",
    fontSize: "14px",
    marginTop: "20px",
  },
};

export default ResetPasswordTemplate;
