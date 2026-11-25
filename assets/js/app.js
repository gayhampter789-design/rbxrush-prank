(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const GENERATION_DURATION_MS = 64_000;

  const form = $("#generator-form");
  const amountButtons = $$(".amount-option");
  const selectedAmountLabel = $("#selected-amount");
  const generateButton = $("#generate-button");
  const processingPanel = $("#processing-panel");
  const revealPanel = $("#reveal-panel");
  const progressFill = $("#progress-fill");
  const progressNumber = $("#progress-number");
  const progressStage = $("#progress-stage");
  const progressTime = $("#progress-time");
  const terminalLines = $("#terminal-lines");
  const restartButton = $("#restart-button");

  let selectedAmount = 800;
  let generationStartedAt = 0;
  let generationTimer = null;
  let counterTimer = null;
  let requests = 8421;
  let pool = 1_284_900;
  let queue = 247;

  const format = (value) => new Intl.NumberFormat("en-US").format(value);
  const scrollToGenerator = () => $("#generator").scrollIntoView({ behavior: "smooth", block: "start" });

  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedAmount = Number(button.dataset.amount);
      amountButtons.forEach((option) => {
        const isSelected = option === button;
        option.classList.toggle("selected", isSelected);
        option.setAttribute("aria-pressed", String(isSelected));
      });
      selectedAmountLabel.textContent = format(selectedAmount);
    });
  });

  function updateCounters() {
    // These counters are decorative simulations and are not connected to Roblox.
    pool += Math.floor(Math.random() * 13) + 2;
    queue = Math.max(112, Math.min(398, queue + Math.floor(Math.random() * 13) - 6));
    requests += Math.floor(Math.random() * 3) + 1;
    $("#global-pool").textContent = format(pool);
    $("#queue-count").textContent = format(queue);
    $("#hero-requests").textContent = format(requests);
  }

  function addTerminalLine(message, type = "SYS") {
    const line = document.createElement("p");
    const prefix = document.createElement("b");
    prefix.textContent = `[${type}] `;
    line.append(prefix, document.createTextNode(message));
    terminalLines.append(line);
    while (terminalLines.children.length > 4) terminalLines.firstElementChild.remove();
  }

  const stages = [
    { at: 0, label: "Connecting to RBX Rush node", line: "Establishing a totally secure connection..." },
    { at: 12_000, label: "Verifying generator request", line: "Request accepted. Checking imaginary permissions..." },
    { at: 30_000, label: "Syncing Robux balance", line: "Synchronizing with the definitely real Robux cloud..." },
    { at: 46_000, label: "Finalizing transfer sequence", line: "Almost there. Aligning digital vibes..." }
  ];
  let lastStageIndex = -1;

  function startGeneration(event) {
    event.preventDefault();
    if (generationTimer) return;

    form.hidden = true;
    processingPanel.hidden = false;
    revealPanel.hidden = true;
    generationStartedAt = Date.now();
    lastStageIndex = -1;
    terminalLines.replaceChildren();
    addTerminalLine("Secure session initialized...");
    addTerminalLine("Waiting for generator handshake...");
    progressFill.style.width = "0%";
    progressNumber.textContent = "0%";
    progressTime.textContent = "64s";
    scrollToGenerator();

    generationTimer = window.setInterval(() => {
      const elapsed = Math.min(Date.now() - generationStartedAt, GENERATION_DURATION_MS);
      const progress = Math.min(100, (elapsed / GENERATION_DURATION_MS) * 100);
      const secondsLeft = Math.ceil((GENERATION_DURATION_MS - elapsed) / 1000);
      progressFill.style.width = `${progress}%`;
      progressNumber.textContent = `${Math.floor(progress)}%`;
      progressTime.textContent = `${secondsLeft}s`;

      const stageIndex = stages.reduce((current, stage, index) => elapsed >= stage.at ? index : current, 0);
      if (stageIndex !== lastStageIndex) {
        lastStageIndex = stageIndex;
        progressStage.textContent = stages[stageIndex].label;
        if (stageIndex > 0) addTerminalLine(stages[stageIndex].line, "CORE");
      }

      if (elapsed >= GENERATION_DURATION_MS) finishGeneration();
    }, 100);
  }

  function finishGeneration() {
    window.clearInterval(generationTimer);
    generationTimer = null;
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - generationStartedAt) / 1000));
    progressFill.style.width = "100%";
    progressNumber.textContent = "100%";
    progressTime.textContent = "DONE";
    progressStage.textContent = "Process complete";
    addTerminalLine("Just kidding. This was a prank website.", "INFO");

    window.setTimeout(() => {
      processingPanel.hidden = true;
      revealPanel.hidden = false;
      $("#time-wasted").textContent = `${elapsedSeconds} seconds`;
      $("#reveal-amount").textContent = `${format(selectedAmount)} R$`;
      scrollToGenerator();
    }, 900);
  }

  function resetGenerator() {
    window.clearInterval(generationTimer);
    generationTimer = null;
    processingPanel.hidden = true;
    revealPanel.hidden = true;
    form.hidden = false;
    selectedAmount = 800;
    amountButtons.forEach((button) => {
      const isSelected = Number(button.dataset.amount) === selectedAmount;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    selectedAmountLabel.textContent = format(selectedAmount);
    generateButton.focus({ preventScroll: true });
    scrollToGenerator();
  }

  form.addEventListener("submit", startGeneration);
  restartButton.addEventListener("click", resetGenerator);
  $("#current-year").textContent = String(new Date().getFullYear());

  updateCounters();
  counterTimer = window.setInterval(updateCounters, 2600);
  window.addEventListener("pagehide", () => {
    window.clearInterval(counterTimer);
    window.clearInterval(generationTimer);
  }, { once: true });
})();
