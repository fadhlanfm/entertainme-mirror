import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Card from "../components/Card";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { GET_TV, GET_TVSERIES, ADD_TV } from "../queries/tv";
import Loading from "../components/Loading";

export default () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading, error, data } = useQuery(GET_TVSERIES);

  const [addTv] = useMutation(ADD_TV, {
    update(cache, { data: { addTv } }) {
      const { getAllTvSeries } = cache.readQuery({ query: GET_TVSERIES });
      cache.writeQuery({
        query: GET_TVSERIES,
        data: { getAllTvSeries: getAllTvSeries.concat([addTv]) },
      });
    },
  });

  const newCreate = {};
  const [newTitle, setNewTitle] = useState("");
  const [newOverview, setNewOverview] = useState("");
  const [newPoster_path, setNewPoster_path] = useState("");
  const [newPopularity, setNewPopularity] = useState(0);
  const [newTags, setNewTags] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    newCreate.title = newTitle;
    newCreate.overview = newOverview;
    newCreate.poster_path = newPoster_path;
    newCreate.popularity = +newPopularity;
    newCreate.tags = newTags.split(",").map((el) => el.trim());

    addTv({ variables: newCreate });
    toast.success("Successfully Added");

    setNewTitle("");
    setNewOverview("");
    setNewPoster_path("");
    setNewPopularity(0);
    setNewTags([]);
    setShow(false);
  };

  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleOverview = (e) => {
    setNewOverview(e.target.value);
  };
  const handlePoster_path = (e) => {
    setNewPoster_path(e.target.value);
  };
  const handlePopularity = (e) => {
    setNewPopularity(e.target.value);
  };
  const handleTags = (e) => {
    setNewTags(e.target.value);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error...{error}</p>;
  }

  return (
    <>
      <h1>TV</h1>

      <button className="btn btn-primary m-2" onClick={handleShow}>
        Add New Tv
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tv</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label className="col-form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleTitle}
                value={newCreate.title}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Overview:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleOverview}
                value={newCreate.overview}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Poster Path:</label>
              <input
                type="text"
                className="form-control"
                onChange={handlePoster_path}
                value={newCreate.poster_path}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Popularity:</label>
              <input
                type="text"
                className="form-control"
                onChange={handlePopularity}
                value={newCreate.popularity}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Tags:</label>
              <input
                type="text"
                className="form-control"
                onChange={handleTags}
                value={newCreate.tags}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary m-2">
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="cardColumns">
        {data.getAllTvSeries.map((tv) => {
          return <Card key={tv._id} content={tv} from={"/tv"}></Card>;
        })}
      </div>
    </>
  );
};
