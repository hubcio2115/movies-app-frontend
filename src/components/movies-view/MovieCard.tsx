import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Movie from "interfaces/Movie";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/system";
import { pink } from "@mui/material/colors";

interface Props {
  movie: Movie;
  isSelecting?: boolean;
  selectedMovies?: number[];
  setSelectedMovies?: Dispatch<SetStateAction<number[]>>;
  favoriteMovies: Movie[];
  setFavoriteMovies: Dispatch<SetStateAction<Movie[]>>;
  isFavoriteProp: boolean;
}

const MovieCard: FC<Props> = ({
  movie,
  isSelecting,
  selectedMovies = [],
  setSelectedMovies = () => {},
  favoriteMovies,
  setFavoriteMovies,
  isFavoriteProp,
}) => {
  const [checked, setChecked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavoriteProp);
  const navigate = useNavigate();

  const handleCheckbox = () => {
    setChecked(!checked);

    if (!checked) {
      setSelectedMovies([...selectedMovies, movie.id]);
    } else {
      const temp = [...selectedMovies].filter((id) => {
        return id !== movie.id;
      });

      setSelectedMovies(temp);
    }
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);

      setFavoriteMovies([...favoriteMovies, movie]);
    } else {
      setIsFavorite(false);

      const temp = [...favoriteMovies].filter((favoriteMovie) => {
        return favoriteMovie.id !== movie.id;
      });

      setFavoriteMovies(temp);
    }
  };

  useEffect(() => {
    if (favoriteMovies.indexOf(movie) === -1) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }, [favoriteMovies, movie]);

  return (
    <Card sx={{ maxWidth: "600px" }}>
      <Box sx={{ display: "flex", position: "relative" }}>
        <CardMedia
          component="img"
          height={330}
          image={movie.image_url}
          alt="movie-poster"
          onClick={() => {
            if (isSelecting) {
              handleCheckbox();
            } else {
              navigate(`/movie-details/${movie.id}`);
            }
          }}
          sx={{ cursor: "pointer", width: 210 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {isSelecting ? (
            <Checkbox
              name="select"
              id="select-checkbox"
              checked={checked}
              onChange={() => {
                handleCheckbox();
              }}
              sx={{ position: "absolute", right: 0 }}
            />
          ) : null}
          <CardContent
            onClick={() => {
              if (isSelecting) {
                handleCheckbox();
              } else {
                navigate(`/movie-details/${movie.id}`);
              }
            }}
            sx={{
              maxWidth: `(100% - ${550}px)`,
              cursor: "pointer",
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">{movie.title}</Typography>
            <Typography variant="body1">Reżyser: {movie.director}</Typography>
            <Typography variant="body1">Gatunek: {movie.genre}</Typography>
            <Typography variant="body1">Rok premiery: {movie.year}</Typography>
            <br />
            <Typography variant="body2">{movie.description}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="dodaj do ulubionych"
              onClick={() => {
                handleFavorite();
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorder sx={{ color: pink[500] }} />
              )}
            </IconButton>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default MovieCard;
