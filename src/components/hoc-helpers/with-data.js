import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const withData = View => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      hasError: false
    };

    updateList() {
      this.setState({
        loading: true,
        hasError: false
      });
      this.props
        .getData()
        .then(data => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            hasError: true,
            loading: false
          });
        });
    }

    componentDidMount() {
      this.updateList();
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.updateList();
      }
    }

    componentDidCatch() {
      this.setState({ hasError: true });
    }

    render() {
      const { data, hasError, loading } = this.state;

      if (loading) {
        return <Spinner />;
      }
      if (hasError) {
        return <ErrorIndicator />;
      }
      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
