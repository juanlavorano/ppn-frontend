import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import colors from "styles/colors";
import Logo from "components/Logo";

const Icon = () => <Logo />;

export default function RoadmapComponent() {
  return (
    <VerticalTimeline>
      <VerticalTimelineElement
        contentStyle={{ background: colors.backgroundLight }}
        iconStyle={{ background: colors.backgroundLight, color: colors.black }}
        icon={<Icon />}
      >
        <h3 className="vertical-timeline-element-title">Gen 0 Launch </h3>
        <p>
          Discord + Twitter socials creation.
          <br />
          10.000 unique PPN NFTs available for everyone (no whitelist) to mint
          in our website.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        contentStyle={{ background: colors.backgroundLight }}
        iconStyle={{ background: colors.backgroundLight, color: colors.black }}
        icon={<Icon />}
      >
        <h3 className="vertical-timeline-element-title">Mural + Metaverse</h3>
        <p>
          First mural painted on the streets <br />
          The SANDBOX + NFT WORLDS land purchase to create PPN's metaverse,
          unique games, expand the brand and host our exclusive events (only
          accesible for NFTs holders). Revenues from this will build the DAO's
          reserve.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        contentStyle={{ background: colors.backgroundLight }}
        iconStyle={{ background: colors.backgroundLight, color: colors.black }}
        icon={<Icon />}
      >
        <h3 className="vertical-timeline-element-title">
          Privacy projects
        </h3>
        <p>
          Monero + Calamari (private transactions) and Phala (private cloud
          computing) nodes setup <br />
          Revenues from this will build the DAO's reserve.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        contentStyle={{ background: colors.backgroundLight }}
        iconStyle={{ background: colors.backgroundLight, color: colors.black }}
        icon={<Icon />}
      >
        <h3 className="vertical-timeline-element-title">
          Gen 1 reveal + staking
        </h3>
        <p>
          Gen 1 collection (animated) sale. Gen 0 holders will have priority to
          mint. <br />
          Giveaway in socials. <br />
          Staking functionality is activated to earn $PPN.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        contentStyle={{ background: colors.backgroundLight }}
        iconStyle={{ background: colors.backgroundLight, color: colors.black }}
        icon={<Icon />}
      >
        <h3 className="vertical-timeline-element-title">DAO Launch</h3>
        <p>
          Vote power in terms of how much $PPN a holder has. <br />
          First DAO decision: Buy one top tier NFT. <br />
          Second DAO decision: Second mural placement (city TBD). <br />
          Third DAO decision: Partnership with validator to lower staking comissions to $PPN holders <br />
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        contentStyle={{ background: colors.backgroundLight }}
        iconStyle={{ background: colors.backgroundLight, color: colors.black }}
        icon={<Icon />}
      >
        <h3 className="vertical-timeline-element-title">Expansion and ++</h3>
        <p>
          Partnerships with other NFTs projects and DEFI privacy project. <br />
          Marketing and more...
        </p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
}
