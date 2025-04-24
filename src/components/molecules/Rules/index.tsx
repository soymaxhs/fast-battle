import { Accordion } from "react-bootstrap";

export function Rules() {
  return (
    <Accordion
      defaultActiveKey="0"
      alwaysOpen={false}
      className="container py-4 bg-light rounded-3"
    >
      {/* 1 · Goal */}
      <Accordion.Item eventKey="0">
        <Accordion.Header>1 · Goal</Accordion.Header>
        <Accordion.Body>
          Collect the <strong>most victories</strong>.
        </Accordion.Body>
      </Accordion.Item>

      {/* 2 · Normal Round */}
      <Accordion.Item eventKey="1">
        <Accordion.Header>2 · Normal Round (five-dice roll)</Accordion.Header>
        <Accordion.Body>
          <ol className="list-group list-group-numbered">
            <li className="list-group-item">
              All players roll <strong>five dice</strong>.
            </li>
            <li className="list-group-item">
              Ignore any value appearing more than once.
            </li>
            <li className="list-group-item">
              The
              <strong>
                <em> highest </em>
              </strong>
              remaining unique value is your score (0 if none are unique).
            </li>
            <li className="list-group-item">
              If exactly one player has the top score, they win the round and
              take <strong>1 victory</strong>.
            </li>
            <li className="list-group-item">
              If two or more players tie, see <strong>SuddenDeath</strong>.
            </li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>

      {/* 3 · Sudden Death */}
      <Accordion.Item eventKey="2" id="sudden-death">
        <Accordion.Header>
          3 · SuddenDeath Round (three-dice roll)
        </Accordion.Header>
        <Accordion.Body>
          <ol className="list-group list-group-numbered">
            <li className="list-group-item">
              Only tied players roll <strong>three dice</strong>.
            </li>
            <li className="list-group-item">
              Apply the same unique-value rule, but the
              <strong>
                <em> lowest </em>
              </strong>
              unique value wins.
            </li>
            <li className="list-group-item">
              Repeat if still tied; the winner takes <strong>1 victory</strong>.
            </li>
          </ol>
        </Accordion.Body>
      </Accordion.Item>

      {/* 4 · End of Match */}
      <Accordion.Item eventKey="3">
        <Accordion.Header>4 · End of match</Accordion.Header>
        <Accordion.Body>
          A pre-set number of rounds elapses— the player with the
          <strong> most victories</strong> wins.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
