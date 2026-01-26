import {Composition} from 'remotion';
import {VimGolfPromo} from './VimGolfPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VimGolfPromo"
        component={VimGolfPromo}
        durationInFrames={1350} // 45 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
