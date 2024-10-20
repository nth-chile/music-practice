import Dot from './Dot';

interface Props {
    className?: string;
    numNotes: number;
}

const EmptyDots = ({
    className, numNotes
}: Props) => {
    const dots = [];

    for (let i = 0; i < numNotes; i++) {
        dots.push(<Dot key={i} variant="empty" className={i + 1 === numNotes ? '' : 'mr-4'} />);
    }

    return (
        <div className={className}>
            {dots}
        </div>
    );
};

export default EmptyDots;
