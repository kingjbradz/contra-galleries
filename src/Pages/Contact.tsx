import { useForm, ValidationError } from "@formspree/react";
import { Box, Typography, TextField, Button, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(() => ({
  borderRadius: "8px",
  backgroundColor: "#FFFEFE",
}));

const Contact = () => {
  const is600 = useMediaQuery("( min-width: 600px )");
  const [state, handleSubmit] = useForm("xwkwrkyr");
  if (state.succeeded) {
    return (
      <Typography sx={{ textAlign: "center" }}>
        Thanks for getting in touch! <br /> We'll get back to you soon
      </Typography>
    );
  }
  return (
    <Box sx={{ flexDirection: "column", height: "100%" }}>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          minWidth: is600 ? "350px" : "100%",
          height: "100%",
          justifyContent: "center"
        }}
      >
        <Typography sx={{ marginBottom: 2 }}>Get in Touch</Typography>
        <StyledTextField
          id="name"
          type="name"
          name="name"
          // color="outline"
          size="small"
          label={
            <label
              htmlFor="name"
              style={{
                backgroundColor: "#FFFEFE",
                borderRadius: "4px",
                padding: "0 2px",
              }}
            >
              Name
            </label>
          }
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
        <br />
        <StyledTextField
          id="email"
          type="email"
          name="email"
          // color="outline"
          size="small"
          label={
            <label
              htmlFor="email"
              style={{
                backgroundColor: "#FFFEFE",
                borderRadius: "4px",
                padding: "0 2px",
              }}
            >
              Email Address
            </label>
          }
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <br />
        <StyledTextField
          multiline={true}
          minRows={3}
          id="message"
          name="message"
          // color="outline"
          size="small"
          label={
            <label
              htmlFor="message"
              style={{
                backgroundColor: "#FFFEFE",
                borderRadius: "4px",
                padding: "0 2px",
              }}
            >
              Message
            </label>
          }
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <br />
        <Button
          fullWidth={false}
          type="submit"
          disabled={state.submitting}
          variant="outlined"
          sx={{
            paddingRight: 2,
            paddingLeft: 2,
            bgcolor: "brand.secondary",
            color: "brand.outline",
            borderColor: "brand.outline",
            "&:hover": {
              bgcolor: "brand.secondary",
              color: "brand.outline",
            },
          }}
        >
          Submit
        </Button>
      </form>
      <br />
      <Typography sx={{ textAlign: "center" }}>
          You can also reach us on <a href="https://www.instagram.com/contragalleries" target="_blank" style={{ color: "black" }}>Instagram</a>.
      </Typography>
    </Box>
  );
};

export default Contact;