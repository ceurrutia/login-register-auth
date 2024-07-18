import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div>
      <div className="container-fluid">
        <h1>Register Page</h1>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              {...register("username", { required: true })}
              placeholder="username"
            />
            {errors.username && <p className="red"> Username is required </p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email", { required: true })}
              placeholder="your-email@email.com"
            />
            {errors.email && <p className="red"> Email is required </p>}
            {registerErrors.map((error, i) => (
              <div className="red" key={i}>
                {error}
              </div>
            ))}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", { required: true })}
              placeholder="your-password"
            />
            {errors.password && <p className="red"> Password is required </p>}
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
