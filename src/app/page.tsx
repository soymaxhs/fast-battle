"use client";

import { Rules } from "@/components/molecules/Rules";
import DicesScene from "@/components/organisms/DicesScene";
import {
  DEFAULT_NORMAL_ROLLS,
  DEFAULT_PLAYERS,
  DEFAULT_PLAYERS_ROUND,
  DEFAULT_SUDDEN_DEATH_ROLLS,
  NORMAL_ROLL,
  ROLL_TYPE,
  SUDDEN_DEATH_ROLL,
} from "@/config/constants";
import { GameState, PlayersRound } from "@/types";
import {
  getNormalRoundWinnerPlayers,
  getPlayerDiceRolls,
  getSuddenDeathRoundWinnerPlayers,
} from "@/utilities";
import { useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormCheck,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

/**
 * MainPage renders the homepage with a title and two player cards.
 * Uses React Bootstrap for layout and styling.
 *
 * @returns {JSX.Element} The main layout of the game page.
 */
export default function MainPage() {
  const [showRules, setShowRules] = useState(true);
  const [experimentalMode, setExperimentalMode] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentRollType: ROLL_TYPE.NORMAL,
    players: DEFAULT_PLAYERS,
    currentPlayerIndex: 0,
    historyRounds: [],
    currentRoundIndex: 0,
  });
  const [currentPlayersRound, setCurrentPlayersRound] = useState<PlayersRound>(
    DEFAULT_PLAYERS_ROUND
  );

  /**
   * Handles the click event for the roll button.
   * Simulates rolling dice for both players and updates the game state.
   *
   * TODO: IMPORTANT - Optimize the game state update logic.
   */
  const handleRollClick = () => {
    const {
      players,
      currentPlayerIndex,
      historyRounds,
      currentRoundIndex,
      currentRollType,
    } = gameState;
    const playersCount = players.length;

    if (currentRollType === ROLL_TYPE.NORMAL) {
      const newCurrentPlayersRound: PlayersRound = [...currentPlayersRound];
      const newNormalDiceRolls = getPlayerDiceRolls(NORMAL_ROLL);

      newCurrentPlayersRound[currentPlayerIndex] = {
        playerIndex: currentPlayerIndex,
        rollType: currentRollType,
        diceRolls: [
          newNormalDiceRolls[0],
          newNormalDiceRolls[1],
          newNormalDiceRolls[2],
          newNormalDiceRolls[3],
          newNormalDiceRolls[4],
        ],
      };

      setCurrentPlayersRound(newCurrentPlayersRound);

      if (currentPlayerIndex + 1 === playersCount) {
        const normalRoundWinnerPlayers = getNormalRoundWinnerPlayers(
          newCurrentPlayersRound
        );

        if (normalRoundWinnerPlayers.length === 1) {
          const newPlayers = [...players];

          newPlayers[normalRoundWinnerPlayers[0]].victories += 1;

          const newGameState: GameState = {
            ...gameState,
            players: newPlayers,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);
        } else {
          const newGameState: GameState = {
            ...gameState,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            currentRollType: ROLL_TYPE.SUDDEN_DEATH,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);

          setCurrentPlayersRound((prevState) =>
            prevState.map((player) => ({
              ...player,
              rollType: ROLL_TYPE.SUDDEN_DEATH,
              diceRolls: DEFAULT_SUDDEN_DEATH_ROLLS,
            }))
          );
        }
      } else {
        setGameState((prevState) => ({
          ...prevState,
          currentPlayerIndex: currentPlayerIndex + 1,
        }));
      }
    }

    if (currentRollType === ROLL_TYPE.SUDDEN_DEATH) {
      const newCurrentPlayersRound: PlayersRound = [...currentPlayersRound];
      const newSuddenDeathDiceRolls = getPlayerDiceRolls(SUDDEN_DEATH_ROLL);

      newCurrentPlayersRound[currentPlayerIndex] = {
        playerIndex: currentPlayerIndex,
        rollType: currentRollType,
        diceRolls: [
          newSuddenDeathDiceRolls[0],
          newSuddenDeathDiceRolls[1],
          newSuddenDeathDiceRolls[2],
        ],
      };

      setCurrentPlayersRound(newCurrentPlayersRound);

      if (currentPlayerIndex + 1 === playersCount) {
        const suddenDeathRoundWinnerPlayers = getSuddenDeathRoundWinnerPlayers(
          newCurrentPlayersRound
        );

        if (suddenDeathRoundWinnerPlayers.length === 1) {
          const newPlayers = [...players];

          newPlayers[suddenDeathRoundWinnerPlayers[0]].victories += 1;

          const newGameState: GameState = {
            ...gameState,
            players: newPlayers,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            currentRollType: ROLL_TYPE.NORMAL,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);

          setCurrentPlayersRound((prevState) =>
            prevState.map((player) => ({
              ...player,
              rollType: ROLL_TYPE.NORMAL,
              diceRolls: DEFAULT_NORMAL_ROLLS,
            }))
          );
        } else {
          const newGameState: GameState = {
            ...gameState,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);
        }
      } else {
        setGameState((prevState) => ({
          ...prevState,
          currentPlayerIndex: currentPlayerIndex + 1,
        }));
      }
    }
  };

  const handleCreatePlayerClick = () => {
    const newPlayer = {
      name: `Player ${gameState.players.length + 1}`,
      victories: 0,
    };

    const newPlayers = [...gameState.players, newPlayer];

    const newCurrentPlayersRound: PlayersRound = newPlayers.map((_, index) => ({
      playerIndex: index,
      rollType: ROLL_TYPE.NORMAL,
      diceRolls: DEFAULT_NORMAL_ROLLS,
    }));

    setCurrentPlayersRound(newCurrentPlayersRound);

    setGameState((prevState) => ({
      ...prevState,
      players: newPlayers,
      currentPlayerIndex: 0,
      historyRounds: [],
      currentRoundIndex: 0,
    }));
  };

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">Speed Battle Dice Game</h1>
          <small>
            <FormCheck
              type="switch"
              label="Show Rules"
              checked={showRules}
              onChange={(e) => setShowRules(e.target.checked)}
            />
          </small>
          <small>
            <FormCheck
              type="switch"
              label="Experimental Mode"
              checked={experimentalMode}
              onChange={(e) => setExperimentalMode(e.target.checked)}
              disabled={experimentalMode}
            />
          </small>
          {showRules && <Rules />}
          <h2
            className={`text-center mb-4 ${
              gameState.currentRollType === ROLL_TYPE.NORMAL
                ? "text-primary"
                : "text-danger"
            }`}
          >
            {gameState.currentRollType === ROLL_TYPE.NORMAL
              ? "Normal Round"
              : "Sudden Death Round"}
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {gameState.players?.map((player, index) => (
          <Col key={index} xs={12} md={6} className="mb-4">
            <Card>
              <CardBody>
                <CardTitle className="text-center">
                  {player.name}
                  <Badge bg="secondary ms-3">{`Victories: ${player.victories}`}</Badge>
                </CardTitle>
                <DicesScene diceRolls={currentPlayersRound[index].diceRolls} />
              </CardBody>
            </Card>
          </Col>
        ))}
        {experimentalMode && (
          <Col xs={12} md={6} className="mb-4">
            <Card>
              <CardBody>
                <CardTitle className="text-center">
                  <button
                    className="btn btn-success"
                    onClick={handleCreatePlayerClick}
                  >
                    Add Player
                  </button>
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>

      <Row>
        <Col className="text-center">
          <button className="btn btn-primary" onClick={handleRollClick}>
            {`${gameState.players[gameState.currentPlayerIndex].name} Roll!`}
          </button>
        </Col>
      </Row>

      {/** TODO: IMPORTANT - Optimize the history rendering */}
      <Row className="mt-4">
        <Col md={{ span: 8, offset: 2 }}>
          <h3 className="mb-3 text-center">History</h3>

          {gameState.historyRounds.map((round, idx) => {
            const isNormal = round[0].rollType === ROLL_TYPE.NORMAL;
            const headerVar = isNormal ? "bg-primary" : "bg-danger";
            const headerTxt = isNormal ? "Normal Round" : "Sudden-Death Round";

            const winnerIdxs = isNormal
              ? getNormalRoundWinnerPlayers(round)
              : getSuddenDeathRoundWinnerPlayers(round);

            const isDraw = winnerIdxs.length !== 1;
            const winnersNames = winnerIdxs
              .map((i) => gameState.players[i].name)
              .join(", ");

            return (
              <Card key={idx} className="mb-3 shadow-sm">
                <Card.Header className={`${headerVar} text-white`}>
                  {`Round ${idx + 1}`}
                  <span className="fw-light">— {headerTxt}</span>
                </Card.Header>

                <Row>
                  <Col>
                    <ListGroup variant="flush">
                      {round.map((playerRound, pIdx) => (
                        <ListGroupItem
                          key={pIdx}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span className="fw-semibold">
                            {gameState.players[pIdx].name}
                          </span>

                          <span className="font-monospace">
                            {playerRound.diceRolls.join(" · ")}
                          </span>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={4}>
                    <h6
                      className={`d-flex justify-content-center align-items-center h-100 p-3 ${
                        isDraw
                          ? "bg-warning text-dark"
                          : "bg-success text-white"
                      }`}
                    >
                      <strong>
                        {isDraw ? "Draw" : `Winner: ${winnersNames}`}
                      </strong>
                    </h6>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
