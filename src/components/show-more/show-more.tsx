type Props = {
  onClick: () => void;
};

export function ShowMore({ onClick }: Props) {
  return (
    <div className="catalog__more" onClick={onClick}>
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  );
}
