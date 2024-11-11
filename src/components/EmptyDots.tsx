import Dot from './Dot';
import useLevel from '@/fns/useLevel';

interface Props {
    className?: string;
}

const EmptyDots = ({
    className
}: Props) => {
    const { numNotes } = useLevel();
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
