import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";


class BookEdit extends Component {
  emptyBookList = {
    title: "",
    author: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyBookList,
    };
  }
  async componentDidMount() {
    const booklistId = window.location.href.split("/")[4];
    // if (this.props.match.params.id !== 'new') {
    if (booklistId !== "new") {
      const booklist=
        // await (await fetch(`/api/inventory/${this.props.match.params.id}`)).json();
        await (await fetch(`/api/booklist/${booklistId}`)).json();

      this.setState({ item: booklist });
    }
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/booklist", {
      method: item._id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    // this.props.history.push('/inventories');
    window.location.href = "/booklists";
  };
  render() {
    const { item } = this.state;
    const title = (
      <h2 className="mt-3">
        {/* if item has an id number, otherwise... */}
        {item._id ? "Edit Booklits" : "Add Booklist"}
      </h2>
    );
    return (
      <div>
        <Container>
          {/* display the appropriate title*/}
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="prodname" className="h5 mt-3">
                Book Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={item.title || ""}
                onChange={this.handleChange}
                autoComplete="title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="author" className="h5 mt-3">
                Author
              </Label>
              <Input
                type="text"
                name="author"
                id="author"
                value={item.author || ""}
                onChange={this.handleChange}
                autoComplete="author"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit" className="mt-3">
                Save
              </Button>{" "}
              <Button
                color="secondary"
                className="mt-3"
                tag={Link}
                to="/booklists"
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default BookEdit;
