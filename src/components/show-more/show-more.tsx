type Props = {
  onClick: () => void;
};

export default function ShowMore({ onClick }: Props) {
  return (
    <div className="catalog__more" onClick={onClick}>
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  );
}
