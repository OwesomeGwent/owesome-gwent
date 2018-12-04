import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { CardData } from '../../../../shared/ICardData';
import {
  CardLocaleDataList,
  KeyWordData,
  KeyWordLocaleDataList,
} from '../../../../shared/ILocaleData';
import { IRootState } from '../../reducers';
import {
  makeGetCardDetailByLocale,
  makeGetCategoryByLocale,
  makeGetkeywordInfoByLocale,
} from '../../selectors/locale';

const INFO_REG = new RegExp(/<keyword=(\w+)>(.+?)<\/keyword>/, 'gim');
const KEYWORD_REG = new RegExp(/<(.+?)>(.+?)<\/color>/, 'gim');

const styles = ({ palette }: Theme) =>
  createStyles({
    paper: {
      width: 400,
      padding: '20px 30px',
      fontSize: 14,
      zIndex: 101,
    },
    divider: {
      backgroundColor: palette.primary.main,
    },
  });
export interface ICardDetailProps extends WithStyles<typeof styles>, CardData {}
const highlight = (
  reg: RegExp,
  callback: (substr: string, ...p: any) => string,
) => {
  return (target: string) => {
    const newTarget = target.replace(reg, callback);
    return newTarget;
  };
};
const replaceReach = (reach: number) => (substr: string, _: any, p2: any) => {
  return `<strong style="color: #600101; font-weight: 900;">${p2}</strong>: ${reach}`;
};
const replaceInfoAndKeyword = (substr: string, p1: any, p2: any) => {
  return `<strong style="color: #600101; font-weight: 900;">${p2}</strong>`;
};
const getHighlightedReach = (
  reachKeyword: KeyWordData,
  highlightReach: (target: string) => string,
) => {
  if (!reachKeyword) {
    return '';
  }
  const reachRaws = reachKeyword.raw.match(KEYWORD_REG);
  const reachRaw = reachRaws ? reachRaws[0] : '';
  const highlightedReach = reachRaw ? highlightReach(reachRaw) : '';
  return highlightedReach;
};
const CardDetail: SFC<ICardDetailProps & IMapState> = ({
  cardCategories,
  cardDetails,
  reach,
  ingameId,
  classes,
  keywordInfo,
}) => {
  if (!cardDetails) {
    return null;
  }
  const { name, flavor, infoRaw } = cardDetails[ingameId];
  const highlightInfo = highlight(INFO_REG, replaceInfoAndKeyword);
  const highlightKeyword = highlight(KEYWORD_REG, replaceInfoAndKeyword);
  const highlightReach = highlight(KEYWORD_REG, replaceReach(reach));
  const highlightedReach = getHighlightedReach(
    keywordInfo.reach,
    highlightReach,
  );
  return (
    <Paper className={classes.paper}>
      <Typography variant="display1" color="inherit">
        {name}
      </Typography>
      <Typography variant="subheading" color="inherit">
        {cardCategories &&
          cardCategories.map((category, i) => (
            <span key={category}>
              {!!i && ', '}
              {category}
            </span>
          ))}
      </Typography>
      <Typography variant="subtitle2" color="inherit">
        {flavor}
      </Typography>
      <p
        dangerouslySetInnerHTML={{
          __html: `${highlightInfo(infoRaw)} ${highlightedReach}`,
        }}
      />
      {/* TODO: No keywords on mobile */}
      {Object.keys(keywordInfo).length > 0 && (
        <>
          <Divider className={classes.divider} />
          {Object.entries(keywordInfo).map(([key, keyword]) => (
            <p
              key={key}
              dangerouslySetInnerHTML={{
                __html: highlightKeyword(keyword.raw),
              }}
            />
          ))}
        </>
      )}
    </Paper>
  );
};

interface IMapState {
  cardCategories: string[];
  cardDetails: CardLocaleDataList;
  keywordInfo: KeyWordLocaleDataList;
}

const makeMapStateToProps = () => {
  const getCardDetailByLocale = makeGetCardDetailByLocale();
  const getKeywordInfoByLocale = makeGetkeywordInfoByLocale();
  const getCardCategoryByLocale = makeGetCategoryByLocale();
  const mapState = (state: IRootState, props: ICardDetailProps) => ({
    cardDetails: getCardDetailByLocale(state),
    cardCategories: getCardCategoryByLocale(state, props),
    keywordInfo: getKeywordInfoByLocale(state, props),
  });
  return mapState;
};

export default withStyles(styles)(connect(makeMapStateToProps)(CardDetail));
