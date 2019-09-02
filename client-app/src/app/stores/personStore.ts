import { observable, action, computed, configure, runInAction } from "mobx";
import agent from "../api/agent";
import { createContext } from "react";
import { IPerson } from "../../models/Person";
import objectId from "../common/util/util";

configure({ enforceActions: "always" });

class PersonStore {
  @observable personRegistry = new Map();
  @observable loadedPerson: IPerson | null = null;
  // @observable loadingInitial = false;

  @computed get persons() {
    return Array.from(this.personRegistry.values());
  }

  @action loadPersons = async () => {
    try {
      const persons = await agent.Persons.list();
      runInAction("loading persons", () => {
        persons.forEach(person => {
          this.personRegistry.set(person.id, person);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action updatePerson = async (person: IPerson) => {
    try {
      await agent.Persons.update(person);
      runInAction('updating person', () => {
        this.personRegistry.set(person.id, person);
        this.loadedPerson = person;
      })
    } catch (error) {
      console.log(error);
    }
  }

  @action createPerson = async (person: IPerson) => {
    try {
      person.id = objectId();
      await agent.Persons.create(person);
      runInAction("creating person", () => {
        this.personRegistry.set(person.id, person);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action deletePerson = async (id: string) => {
    try {
      await agent.Persons.delete(id);
      runInAction("deleting person", () => {
        this.personRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action loadPerson = async (id: string) => {
    try {
      const person = await agent.Persons.details(id);
      runInAction("loading person", () => {
        this.personRegistry.set(person.id, person);
        this.loadedPerson = person;
      });
      return person;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  @action clearLoadedPerson = () => {
    this.loadedPerson = null;
  }
}

export default createContext(new PersonStore());
