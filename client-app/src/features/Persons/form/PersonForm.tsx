import React, {
  useContext,
  Fragment,
  useState,
  FormEvent,
  useEffect
} from "react";
import { observer } from "mobx-react-lite";
import PersonStore from "../../../app/stores/personStore";
import { Grid, Form, Button } from "semantic-ui-react";
import { IPerson } from "../../../models/Person";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface FormParams {
  id: string;
}

const PersonForm: React.FC<RouteComponentProps<FormParams>> = ({
  history,
  match
}) => {
  const personStore = useContext(PersonStore);
  const {
    createPerson,
    loadPerson,
    loadedPerson,
    clearLoadedPerson,
    updatePerson,
    isSubmitting
  } = personStore;

  const [person, setPerson] = useState<IPerson>({
    id: "",
    firstName: "",
    lastName: "",
    age: 0,
    location: ""
  });

  useEffect(() => {
    if (match.params.id && person.id === "") {
      console.log('Loading Person');
      loadPerson(match.params.id);
      if (loadedPerson) setPerson(loadedPerson);
    }

    return () => {
      clearLoadedPerson();
    };
  }, [
    match.params.id,
    loadPerson,
    setPerson,
    loadedPerson,
    person.id,
    clearLoadedPerson
  ]);

  const handleOnSubmit = () => {
    if (match.params.id) updatePerson(person);
    else createPerson(person!);
    history.push("/Persons");
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setPerson({ ...person, [name]: value });
  };

  if (personStore.isLoading)
    return <LoadingComponent content="Loading Person..." />;

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={6}>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={person.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={person.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Age</label>
              <input
                name="age"
                value={person.age}
                onChange={handleInputChange}
                placeholder="Age"
                type="number"
                min="0"
                max="115"
              />
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <input
                name="location"
                value={person.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
            </Form.Field>
            <Button
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
          </Form>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PersonForm);
