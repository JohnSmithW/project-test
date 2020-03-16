export function returnTemplate(template) {
  template = function() {
    taskSelector.innerHTML = titleHTML;
    answer[0].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[0] });
    answer[1].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[1] });
    answer[2].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[2] });
    answer[3].innerHTML = answerTemplateFunction({ 'answer': testName.answers()[3] });
  }
  return template;
}