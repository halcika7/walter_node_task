import {
  FeatureImageWrapper,
  FeatureWrapper,
  H1,
  Hero,
  HeroCopy,
  Paragraph,
} from './styled';
import { ReactComponent as Free } from '@images/free.svg';
import { ReactComponent as Analysis } from '@images/analysis.svg';
import { ReactComponent as Web } from '@images/web.svg';

const Home = () => (
  <>
    <section>
      <Hero>
        <HeroCopy>
          <H1>Lorem ipsum dolor sit amet consectetur</H1>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            modi minus accusamus provident, itaque, reprehenderit sapiente
            dolorem esse laboriosam voluptas alias magnam.
          </Paragraph>
        </HeroCopy>
        <Free />
      </Hero>
    </section>

    <section>
      <FeatureWrapper>
        <FeatureImageWrapper>
          <Analysis />
          <HeroCopy>
            <H1 as="h2">Lorem ipsum dolor sit amet consectetur</H1>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              modi minus accusamus provident, itaque, reprehenderit sapiente
              dolorem esse laboriosam voluptas alias magnam.
            </Paragraph>
          </HeroCopy>
        </FeatureImageWrapper>
      </FeatureWrapper>
    </section>

    <section>
      <FeatureWrapper>
        <FeatureImageWrapper className="reverse">
          <Web />
          <HeroCopy>
            <H1 as="h2">Lorem ipsum dolor sit amet consectetur</H1>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              modi minus accusamus provident, itaque, reprehenderit sapiente
              dolorem esse laboriosam voluptas alias magnam.
            </Paragraph>
          </HeroCopy>
        </FeatureImageWrapper>
      </FeatureWrapper>
    </section>
  </>
);

export default Home;
