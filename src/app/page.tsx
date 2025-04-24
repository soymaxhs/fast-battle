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
 * TODO: IMPORTANT - Extract client components to their own files.
 *
 * MainPage renders the homepage with a title and two player cards.
 * Uses React Bootstrap for layout and styling.
 *
 * @returns {JSX.Element} The main layout of the game page.
 */
export default function MainPage() {
  const [showRules, setShowRules] = useState(true);
  const [showExperimentalMode, setShowExperimentalMode] = useState(false);
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
   * TODO: IMPORTANT - Smelly handler
   * TODO: Refactor this function to improve readability, consistency, simplicity and maintainability.
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
      /** Generates new player dice rolls for the current player. */
      const newNormalDiceRolls = getPlayerDiceRolls(NORMAL_ROLL);
      const newCurrentPlayersRound: PlayersRound = [...currentPlayersRound];
      // TODO: Smelly code - Refactor this to a utility function.
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
        /** Gets the winner players of the current round. */
        const normalRoundWinnerPlayersIndex = getNormalRoundWinnerPlayers(
          newCurrentPlayersRound
        );

        /** Checks if there is a single winner for the current round. */
        if (normalRoundWinnerPlayersIndex.length === 1) {
          /** Updates the game state to the next round with a single winner. */
          const newPlayers = [...players];
          newPlayers[normalRoundWinnerPlayersIndex[0]].victories += 1;
          const newGameState: GameState = {
            ...gameState,
            players: newPlayers,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);
        } else {
          /** Updates the game state to the next sudden death round for multiple winners. */
          const newGameState: GameState = {
            ...gameState,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            currentRollType: ROLL_TYPE.SUDDEN_DEATH,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);

          /** Updates the current players round to sudden death round. */
          setTimeout(() => {
            setCurrentPlayersRound((prevState) =>
              prevState.map((player) => ({
                ...player,
                rollType: ROLL_TYPE.SUDDEN_DEATH,
                diceRolls: DEFAULT_SUDDEN_DEATH_ROLLS,
              }))
            );
          }, 500);
        }
      } else {
        /** Updates the game state to the next player. */
        setGameState((prevState) => ({
          ...prevState,
          currentPlayerIndex: currentPlayerIndex + 1,
        }));
      }
    }

    if (currentRollType === ROLL_TYPE.SUDDEN_DEATH) {
      /** Generates new player dice rolls for the current player. */
      const newSuddenDeathDiceRolls = getPlayerDiceRolls(SUDDEN_DEATH_ROLL);
      const newCurrentPlayersRound: PlayersRound = [...currentPlayersRound];
      // TODO: Smelly code - Refactor this to a utility function.
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
        /** Gets the winner players of the current round. */
        const suddenDeathRoundWinnerPlayers = getSuddenDeathRoundWinnerPlayers(
          newCurrentPlayersRound
        );

        /** Checks if there is a single winner for the current round. */
        if (suddenDeathRoundWinnerPlayers.length === 1) {
          /** Updates the game state to the next round with a single winner. */
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

          /** Updates the current players round to normal round. */
          setTimeout(() => {
            setCurrentPlayersRound((prevState) =>
              prevState.map((player) => ({
                ...player,
                rollType: ROLL_TYPE.NORMAL,
                diceRolls: DEFAULT_NORMAL_ROLLS,
              }))
            );
          }, 500);
        } else {
          /** Updates the game state to the next sudden death round for multiple winners. */
          const newGameState: GameState = {
            ...gameState,
            currentPlayerIndex: 0,
            currentRoundIndex: currentRoundIndex + 1,
            historyRounds: [...historyRounds, newCurrentPlayersRound],
          };
          setGameState(newGameState);
        }
      } else {
        /** Updates the game state to the next player. */
        setGameState((prevState) => ({
          ...prevState,
          currentPlayerIndex: currentPlayerIndex + 1,
        }));
      }
    }
  };

  /** Experimental function to add a new player. */
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
        </Col>
        <Col>
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
              checked={showExperimentalMode}
              onChange={(e) => setShowExperimentalMode(e.target.checked)}
              disabled={showExperimentalMode}
            />
          </small>
        </Col>
      </Row>

      <Row>
        <Col>{showRules && <Rules />}</Col>
      </Row>

      <Row>
        <Col>
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
          /* TODO: Create a PlayerCard component */
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
        {showExperimentalMode && (
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
          <button
            className="btn btn-primary btn-lg py-3 px-5"
            onClick={handleRollClick}
          >
            {`${gameState.players[gameState.currentPlayerIndex].name} 🔲Roll🔲`}
          </button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          {/**
           * TODO: Create a GameHistory component
           * TODO: Refactor this pseudo component to improve readability, consistency, simplicity and maintainability.
           */}
          <h3 className="mb-3 text-center">History</h3>

          {gameState.historyRounds.toReversed().map((round, idx) => {
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
              <Card key={idx} className="mb-3 shadow-sm w-100">
                <Card.Header className={`${headerVar} text-white`}>
                  {`Round ${idx + 1}`}
                  <span className="fw-light">— {headerTxt}</span>
                </Card.Header>

                <Row className="g-0">
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
